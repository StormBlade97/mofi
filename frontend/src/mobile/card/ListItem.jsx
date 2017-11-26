import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'
import MuiAvatar from 'material-ui/Avatar'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    padding: 2rem 0;
    box-sizing: border-box;
`
const Avatar = styled(MuiAvatar)`
    margin-right: 1.5rem;
    width: 5rem !important;
    height: 5rem !important;
`
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

class ListItem extends React.Component {
    render() {
        return (
<<<<<<< HEAD
            <Wrapper {...this.props}>
                {this.props.avatarSrc && <Avatar imgProps={{ style: { objectFit: "cover" } }} src={this.props.avatarSrc} />}
=======
            <Wrapper style={this.props.style || {}}>
>>>>>>> origin/master
                <TextBox>
                    <Text style={{ marginBottom: this.props.children ? "1.5rem" : "0.5rem" }} useMonserrat={false} type="title" color="accent" fontSize={this.props.forTV ? "1.2rem" : "0.9em"} fontWeight="medium">{this.props.primary || "Primary text"}</Text>
                    { this.props.children ? this.props.children : <Text type="body" color="black" fontWeight={this.props.forTV && "light"}>{this.props.secondary || "SecondaryText"}</Text> }
                </TextBox>
            </Wrapper>
        )
    }
}

export default ListItem
