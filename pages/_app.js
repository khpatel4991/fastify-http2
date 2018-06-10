import React from 'react';
import App, { Container } from 'next/app';
import Link from 'next/link';

export default class MyApp extends App {
	static async getInitialProps ({ Component, router, ctx }) {
    	let pageProps = {}
	    if (Component.getInitialProps) {
      		pageProps = await Component.getInitialProps(ctx)
    	}
    	return {pageProps}
	}

	render () {
		const {Component, pageProps} = this.props
		return (
			<Container>
				<nav>
					<ul>
						<li>
							<Link href="/">
							<a>Home</a>
							</Link>
						</li>
						<li>
							<Link href="/about">
							<a>About</a>
							</Link>
						</li>
						<li>
							<Link href="/contact">
							<a>Contact</a>
							</Link>
						</li>
					</ul>
				</nav>
				<Component {...pageProps} />
			</Container>
		);
	}
}
