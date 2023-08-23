import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Keep Me Posted | Terms and Conditions',
    description: 'Terms and Conditions to use and register with Keep me Posted',
};

const TermsAndConditionsPage = () => {
    return (
        <main className="flex flex-1 flex-col px-10 py-5 mobile:px-3 tablet:px-5">
            <h1 className="mb-5 text-3xl font-bold">Terms & Conditions</h1>
            <section aria-label="terms and condition content" className="flex flex-col gap-y-5 mobile:gap-y-3 tablet:gap-y-4">
                <p>Thank you for joining Keep Me Posted</p>
                <p>
                    These terms and conditions outline the rules and regulations for the use of Keep Me Posted&apos;s Website, located at
                    keep-me-posted.vercel.app
                </p>
                <p>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Keep Me Posted if you
                    do not agree to take all of the terms and conditions stated on this page.
                </p>
                <p>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all
                    Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company&apos;s
                    terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
                </p>

                <p>
                    The Company reserves the right to alter the specification and pricing of the platform at any time. If you are considered
                    to be affected by any changes to the platform and/or pricing of the platform, you will be notified with sufficient
                    notice prior to the implementation of such changes to the service and/or pricing of the platform.
                </p>

                <p>
                    The Company does not guarantee the availability of the platform. However, we will do all that is within our reasonable
                    control to ensure that the platform is available to you.
                </p>

                <p>You agree to use the platform legally, not to use our platform for illegal purposes.</p>

                <p>
                    If we believe you are using our platform illegally or in a manner that violates this policy, we reserve the right to
                    limit, suspend or terminate your access to the platform.
                </p>

                <p>The Company reserves the right to terminate your account at any time without notice.</p>

                <p>During the term of this agreement, the Company may collect and use your personal data and/or contact information.</p>

                <p>
                    The Company will ensure that all data processing complies with the General Data Protection Regulation and the Data
                    Protection Act 2018.
                </p>

                <p>The Company maintains ownership of its intellectual property.</p>

                <p>You will maintain ownership of the files and media that you upload to the platform.</p>

                <p>This agreement does not transfer ownership of any intellectual property.</p>

                <p>
                    The Company reserves the right to take such action as may be appropriate to restrain or prevent the infringement of such
                    Intellectual Property Rights.
                </p>

                <p>
                    The Company shall not be liable for any costs, charges or losses sustained or incurred by you as a result of any issues
                    with the platform or the Company&apos;s operations.
                </p>

                <p>
                    The company shall not have any liability to your, whether in contract, tort (including negligence), for breach of
                    statutory duty, or otherwise, arising under or in connection with this Agreement for:
                </p>

                <ul className="ml-5 list-disc">
                    <li>loss of profits;</li>
                    <li>loss of sales or business;</li>
                    <li>loss of agreements or contracts;</li>
                    <li>loss of anticipated savings;</li>
                    <li>loss of or damage to goodwill;</li>
                    <li>loss of use or corruption of software, data or information;</li>
                    <li>any indirect or consequential loss.</li>
                </ul>

                <p>
                    The terms implied by sections 3 to 5 of the Supply of Goods and Services Act 1982 are, to the fullest extent permitted
                    by law, excluded from this Agreement.
                </p>

                <p>
                    The Company does not accept any responsibility or liability for any downtime or interruptions in the service. Any
                    downtime or interruptions in the Services are not considered a breach of this agreement.
                </p>

                <p>
                    This Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes arising
                    under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive jurisdiction of the
                    English and Welsh courts.
                </p>

                <p>
                    If any court or competent authority finds that any provision (or part) of the Agreement is invalid, illegal or
                    unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity
                    and enforceability of the other provisions of the Agreement will not be affected.
                </p>

                <p>
                    Nothing in this Agreement establishes any employment relationship, partnership or joint venture between the parties, or
                    mean that one party becomes the agent of the other party, nor does the Agreement authorise any party to enter into any
                    commitments for or on behalf of the other party.
                </p>

                <p>
                    This Agreement constitutes the entire agreement between the parties and supersedes all previous agreements, arrangements
                    or understandings between them.
                </p>

                <p>The Company reserves the right to change these terms and conditions at any time without notice.</p>

                <p>
                    If you have any questions regarding these terms and conditions, please contact us via{' '}
                    <Link
                        href="https://github.com/arthurlee945"
                        target="_blank"
                        className="underline hover:text-blue-600 dark:hover:text-blue-300"
                    >
                        github
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default TermsAndConditionsPage;
