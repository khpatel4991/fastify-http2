import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
    	return { ...initialProps }
  	}

  	render() {
    	return (
			<html>
				<Head>
					<link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />
					<link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
					<link rel="manifest" href="/static/manifest.webmanifest" />
					<link rel="stylesheet" href="/static/color.css" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
				</Head>
				<body className="custom_class">
					<Main />
					<NextScript />
				</body>
			</html>
    	);
  	}
}
