import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const GUIDE_INFO: Record<string, { title: string; file: string }> = {
  mold: { title: 'Guide to Mold-Free Living', file: 'mold-free-guide.pdf' },
  laundry: { title: 'Healthy Laundry Guide', file: 'laundry-guide.pdf' },
  water: { title: 'Healthy Water Guide', file: 'water-guide.pdf' },
  lighting: { title: 'Healthy Lighting Guide', file: 'lighting-guide.pdf' },
};

const VALID_GUIDE_IDS = Object.keys(GUIDE_INFO);
const BASE_URL = 'https://guides.senergy360.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, selectedGuides } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !selectedGuides?.length) {
      return NextResponse.json(
        { error: 'All fields are required and at least one guide must be selected.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Validate guide IDs
    const validGuides = selectedGuides.filter((id: string) => VALID_GUIDE_IDS.includes(id));
    if (validGuides.length === 0) {
      return NextResponse.json({ error: 'Invalid guide selection.' }, { status: 400 });
    }

    // Build download links HTML
    const guideLinksHtml = validGuides
      .map((id: string) => {
        const guide = GUIDE_INFO[id];
        return `
          <tr>
            <td style="padding: 12px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: #C5A55A; border-radius: 8px; padding: 14px 24px;">
                    <a href="${BASE_URL}/guides/${guide.file}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; display: block;">
                      Download: ${guide.title}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
      })
      .join('');

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #FAFAF8; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAF8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; border: 1px solid #E5E2DA; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #C5A55A; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 2px;">SENERGY360</h1>
              <p style="margin: 8px 0 0; color: #F5F0E1; font-size: 14px;">Your Path to a Healthier Home</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #2D2D2D; font-size: 22px;">Hi ${firstName},</h2>
              <p style="margin: 0 0 24px; color: #8A8A8A; font-size: 15px; line-height: 1.6;">
                Thank you for joining the SENERGY360 community! Your free guides are ready to download. Click the buttons below to access your selected guides.
              </p>

              <!-- Download Buttons -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${guideLinksHtml}
              </table>

              <hr style="border: none; border-top: 1px solid #E5E2DA; margin: 32px 0;" />

              <p style="margin: 0; color: #8A8A8A; font-size: 13px; line-height: 1.6;">
                These guides contain practical, research-informed strategies you can implement immediately to optimize your home environment and reduce toxic load.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F0E1; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; color: #8A8A8A; font-size: 12px;">
                &copy; 2026 SENERGY360. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from: 'SENERGY360 <guides@senergy360.com>',
      to: email,
      subject: `Your Free SENERGY360 Guides, ${firstName}!`,
      html: htmlEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
