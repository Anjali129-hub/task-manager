from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Task

@receiver(post_save, sender=Task)
def send_task_email(sender, instance, created, **kwargs):
    if created and instance.assigned_to and instance.assigned_to.email:
        subject = f"New Task Assigned: {instance.title}"
        message = f"""
Hello {instance.assigned_to.get_full_name() or instance.assigned_to.username},

You have been assigned a new task:

Title: {instance.title}
Description: {instance.description}
Deadline: {instance.deadline.strftime('%d-%m-%Y %H:%M')}
Priority: {instance.priority}

Please login to the system to view and manage your tasks.

Regards,
Task Manager
"""
        send_mail(
            subject,
            message,
            'noreply@yourdomain.com',  # OR use settings.DEFAULT_FROM_EMAIL
            [instance.assigned_to.email],
            fail_silently=False
        )
