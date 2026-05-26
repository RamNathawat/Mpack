import './globals.css';

export const metadata = {
    title: 'MPACK — Premium Packaging Solutions',
    description: 'MPACK is a premium packaging solutions provider specialising in flexible pouches, canisters, labels, and boxes.',
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
