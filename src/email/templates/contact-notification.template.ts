function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function contactNotificationTemplate(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: Date;
}) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2>New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px;">
        ${escapeHtml(input.message)}
      </div>
      <p><strong>Received:</strong> ${input.receivedAt.toDateString()}</p>
    </div>
  `;
}
