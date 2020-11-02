@component('mail::message')
Hola **{{ $mailData['user_name'] }}**,
el **código** para reestablecer tu contraseña es: **{{ $mailData['reset_password_code'] }}**
Gracias por usar nuestro servicio.
@endcomponent
