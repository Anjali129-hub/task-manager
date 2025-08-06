from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def send_password_reset_email(user):
    reset_link = f"http://localhost:4200/reset-password/{user.id}/"  # 👈 Customize this as needed
    subject = "Reset Your Task Manager Password"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = user.email

    # Plain text version
    text_content = f"Hi {user.email},\nClick the link to reset your password: {reset_link}"

    # HTML version
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2>Password Reset Requested</h2>
        <p>Hi <strong>{user.email}</strong>,</p>
        <p>You recently requested to reset your password. Click the button below to reset it:</p>
        <p style="text-align: center;">
            <a href="{reset_link}" style="background-color: #007bff; color: white; padding: 10px 20px; 
            text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you didn’t request this, you can ignore this email.</p>
        <p>Thanks,<br>Task Manager Team</p>
    </body>
    </html>
    """

    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
