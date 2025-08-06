from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMultiAlternatives  # updated import
from django.conf import settings
from users.models import User
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.all() if getattr(user, 'is_manager', False) else Task.objects.filter(assigned_to=user)

    def perform_create(self, serializer):
        # Get assigned user (if any)
        assigned_to_id = self.request.data.get('assigned_to')
        assigned_to = None

        if assigned_to_id:
            try:
                assigned_to = User.objects.get(pk=int(assigned_to_id))
            except (User.DoesNotExist, ValueError):
                pass  # Leave assigned_to as None if invalid

        # Save the task
        task = serializer.save(
            created_by=self.request.user,
            assigned_to=assigned_to
        )

        # ✅ Send HTML notification email to the assignee
        if assigned_to and assigned_to.email:
            full_name = getattr(assigned_to, 'full_name', assigned_to.username)
            assigned_by = getattr(self.request.user, 'full_name', self.request.user.username)

            subject = f"📝 New Task Assigned: {task.title}"
            from_email = settings.DEFAULT_FROM_EMAIL
            to_email = [assigned_to.email]

            # Plaintext fallback
            text_content = f"""
            Hello {full_name},

            You have been assigned a new task by {assigned_by}.

            Title: {task.title}
            Description: {task.description}
            Deadline: {task.deadline.strftime('%d-%m-%Y %H:%M')}

            Please log in to the portal to view the task.

            Thanks,
            Task Manager
            """

            # HTML email content
            html_content = f"""
            <html>
                <body>
                    <h2>Hello {full_name},</h2>
                    <p><b>{assigned_by}</b> has assigned you a new task:</p>
                    <table style="border:1px solid #ccc; padding:10px;">
                        <tr><td><strong>Title:</strong></td><td>{task.title}</td></tr>
                        <tr><td><strong>Description:</strong></td><td>{task.description}</td></tr>
                        <tr><td><strong>Deadline:</strong></td><td>{task.deadline.strftime('%d-%m-%Y %H:%M')}</td></tr>
                    </table>
                    <p style="margin-top: 10px;">Please log in to your dashboard to take action.</p>
                    <br>
                    <p>Thanks,<br><strong>Task Manager</strong></p>
                </body>
            </html>
            """

            email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
            email.attach_alternative(html_content, "text/html")
            email.send()
