import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-lg font-bold text-navy-900 mb-3">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
  </section>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-400/20 rounded-2xl mb-4">
            <Shield className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-navy-300 text-sm">Last updated: January 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          <Section title="1. Introduction">
            <p>
              KH Educational Services ("we", "our", or "us") is committed to protecting the privacy of students and
              individuals who visit our website or submit enquiries. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your personal information.
            </p>
            <p>
              By using our website or submitting an enquiry form, you consent to the data practices described in this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Personal Identification:</strong> Full name, phone number, email address.</li>
              <li><strong>Academic Information:</strong> Current qualification, desired course, preferred admission year.</li>
              <li><strong>Location Information:</strong> City, state, and preferred study destination states.</li>
              <li><strong>Financial Information:</strong> Budget range for education (no payment details are collected).</li>
              <li><strong>Communication Data:</strong> Any message or additional information you voluntarily provide.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Respond to your admissions and counselling enquiries.</li>
              <li>Provide personalised guidance on course selection and university admissions.</li>
              <li>Contact you via phone, email, or WhatsApp regarding your enquiry.</li>
              <li>Send updates about relevant universities, courses, and admission deadlines.</li>
              <li>Improve our services based on the information and feedback received.</li>
            </ul>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>
              We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share
              your information only in the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>With partner universities or institutions you have expressed interest in, solely for admission processing.</li>
              <li>With trusted service providers who assist us in operating our services, subject to confidentiality agreements.</li>
              <li>As required by applicable law, court order, or governmental authority.</li>
            </ul>
          </Section>

          <Section title="5. Data Storage and Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against
              unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the
              internet or electronic storage is 100% secure.
            </p>
            <p>
              <strong>Note:</strong> This website currently stores submitted enquiry data locally in your browser's
              localStorage for demonstration purposes. In a production environment, all data is transmitted securely to
              our servers.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can
              control the use of cookies through your browser settings. Disabling cookies may affect the functionality
              of certain parts of our website.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your personal data, subject to applicable legal obligations.</li>
              <li>Withdraw consent for processing your data at any time.</li>
              <li>Opt out of promotional communications by contacting us directly.</li>
            </ul>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our website may contain links to third-party websites (such as university portals). We are not responsible
              for the privacy practices or content of such external sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal
              information from children under 16. If you believe we have inadvertently collected such information,
              please contact us immediately.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We reserve the right to update or change this Privacy Policy at any time. Changes will be posted on this
              page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm space-y-1">
              <p><strong>KH Educational Services</strong></p>
              <p>Opposite JSN Grand, MZ Road, Near Ben Circle</p>
              <p>Vijayawada, Andhra Pradesh</p>
              <p>Phone: <a href="tel:7093794711" className="text-navy-700 hover:underline">7093794711</a></p>
            </div>
          </Section>

          {/* Back link */}
          <div className="mt-8 pt-6 border-t">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-navy-700 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
