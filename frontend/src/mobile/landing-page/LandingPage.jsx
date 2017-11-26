import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'
//import svgTitle from './svgTitle.svg'
import darthVaderAvatar from './avatar.svg'
import ListItem from './ListItem'
import MuiButton from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Wrapper from 'atomic-components/CenteredPageContainer';
import {withRouter} from 'react-router-dom';
import UserStore, {hydratedStore} from '../UserStore';
import {observer} from 'mobx-react';

// const Wrapper = styled.div`
//     width: 100vw;
//     height: calc(100vh - 54px);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-around;
//     overflow: hidden;
//     box-sizing: border-box;
//     text-align: center;
// `
const Input = styled.input`
    font-size: 2.5rem;
    outline: none;
    background-color: transparent;
    color: ${props => props.theme.accent};
    border: none;
    border-bottom: 1px black solid;
    text-align: center;
    font-weight: 300;
    padding-bottom: 0.5rem;
    font-family: 'Open-sans', sans-serif;
    width: calc(100vw - 8rem);
    max-width: 40rem;
    letter-spacing: 1px;
`

const Button = styled(MuiButton)`
    border-radius: 3rem !important;
    padding: 1rem 1.5rem !important;
    width: calc(100vw - 8rem) !important;
    max-width: 40rem;
`
const CodeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

@observer
class LandingPage extends React.Component {
	async componentWillMount() {
		await hydratedStore;
		if (this.props.match && this.props.match.params && this.props.match.params.code) {
			UserStore.setCode(this.props.match.params.code);
		}
	}
	startClicked = async () => {
		this.props.history.push("/app/mood-filter");
	}
	updateCode = (e) => {
		UserStore.code = e.target.value;
	}
    render() {
    	const color = {color: UserStore.isValid ? "green" : "red"};
        console.log("color", color, UserStore.isValid);
        console.log(UserStore);
        return (
            <Wrapper>
                <div>
                    <Text type="display1" color="black" fontWeight="bold" gutterBottom>Let's match the moods</Text>
                    <Text color="black" style={{ margin: "0 3rem" }} useMonserrat={false} type="title" fontWeight="light">Enter the code you see on the main screen and start the matching!</Text>
                </div>
                <CodeSection>
                    <Input style={color} onChange={this.updateCode} value={UserStore.code} placeholder="Enter your code"></Input>
				{ (UserStore.name && UserStore.name.length > 0) ?
                    <ListItem avatarSrc={UserStore.avatar_url} primary="Your personal ID" secondary={UserStore.name}></ListItem>
                	: null }
                </CodeSection>
				<Button color="primary" raised disabled={!UserStore.isValidSession} onClick={this.startClicked}>
                    <Text type="subheading" useMonserrat={false}>Start the matching</Text>
                </Button>
            </Wrapper>
        )
    }
}

export default withRouter(LandingPage)
