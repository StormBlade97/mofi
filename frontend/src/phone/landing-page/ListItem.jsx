import React from 'react'
import styled from 'styled-components'
import MuiAvatar from 'material-ui/Avatar'
import Text from 'atomic-components/Text'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    margin-top: 5rem;
`
const Avatar = styled(MuiAvatar)`
    margin-right: 1.5rem;
    width: 5rem !important;
    height: 5rem !important;
`
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

class ListItem extends React.Component {
    render() {
        return (
            <Wrapper>
                <Avatar src={this.props.avatarSrc} />
                <TextBox>
                    <Text type="caption" color="primary" fontSize="1.3rem" thin>{this.props.primary || "Primary text"}</Text>
                    <Text type="title" fontSize="2rem">{this.props.secondary || "SecondaryText"}</Text>
                </TextBox>
            </Wrapper>
        )
    }
}

export default ListItem