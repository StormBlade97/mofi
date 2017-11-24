import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'
import svgTitle from './svgTitle.svg'
import darthVaderAvatar from './avatar.svg'
import { grey } from 'material-ui/colors'
import ListItem from './ListItem'
import MuiButton from 'material-ui/Button';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${ grey[900] };
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    padding: 5rem 0;
    box-sizing: border-box;
`
const SvgTitle = styled.img`
    width: 80vw;
    max-width: 40rem;
`
const Input = styled.input`
    font-size: 2.5rem;
    outline: none;
    background-color: transparent;
    color: rgba(255,255,255, 0.86);
    border: none;
    border-bottom: 3px white solid;
    text-align: center;
    padding-bottom: 0.5rem;
    font-family: 'Open-sans', sans-serif;
    width: calc(100vw - 8rem);
    max-width: 40rem;
`

const Button = styled(MuiButton)`
    border-radius: 3rem !important;
    padding: 1.5rem !important;
    width: calc(100vw - 8rem) !important;
    max-width: 40rem;
`

class LandingPage extends React.Component {
    render() {
        return (
            <Wrapper>
                <SvgTitle src={svgTitle} alt="Let's match the mood"></SvgTitle>
                <Text style={{ margin: "0 3rem" }} useMonserrat={false} type="headline">Enter the code you see on the main screen and start the matching!</Text>
                <Input placeholder="Enter your code"></Input>
                <ListItem avatarSrc={darthVaderAvatar} primary="Your personal ID" secondary="Darth Vader"></ListItem>
                <Button color="primary" raised><Text type="title">Start</Text></Button>
            </Wrapper>
        )
    }
}

export default LandingPage