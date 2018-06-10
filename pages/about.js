class About extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { seconds: 0 };
	}
  
	tick() {
	  this.setState(prevState => ({
		seconds: prevState.seconds + 1
	  }));
	}
  
	componentDidMount() {
	  this.interval = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<p>
				Seconds: {this.state.seconds}
			</p>
		);
	}
}

export default About;