import React from 'react';
import App, { Container } from 'next/app';
import Link from 'next/link';
import { PageTransition } from  "next-page-transitions";
import Loader from '../src/components/Loader';

const TIMEOUT = 400

export default class MyApp extends App {
	static async getInitialProps ({ Component, router, ctx }) {
    	let pageProps = {}
	    if (Component.getInitialProps) {
      		pageProps = await Component.getInitialProps(ctx)
    	}
    	return {pageProps}
	}

	render () {
		const { Component, pageProps } = this.props;
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
				<PageTransition
					timeout={TIMEOUT}
					classNames='page-transition'
					loadingComponent={<Loader />}
					loadingDelay={500}
					loadingTimeout={{
						enter: TIMEOUT,
						exit: 0
					}}
					loadingClassNames='loading-indicator'
				>
					<Component {...pageProps} />
				</PageTransition>
				<style jsx global>{`
					.page-transition-enter {
						opacity: 0;
						transform: translate3d(0, 20px, 0);
					}
					.page-transition-enter-active {
						opacity: 1;
						transform: translate3d(0, 0, 0);
						transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
					}
					.page-transition-exit {
						opacity: 1;
					}
					.page-transition-exit-active {
						opacity: 0;
						transition: opacity ${TIMEOUT}ms;
					}
					.loading-indicator-appear,
					.loading-indicator-enter {
						opacity: 0;
					}
					.loading-indicator-appear-active,
					.loading-indicator-enter-active {
						opacity: 1;
						transition: opacity ${TIMEOUT}ms;
					}
				`}</style>
			</Container>
		);
	}
}
