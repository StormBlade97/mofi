import React from 'react'
import styled from 'styled-components'
import MuiAvatar from 'material-ui/Avatar'
import Text from 'atomic-components/Text'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    margin-top: 4rem;
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
            <Wrapper>
                {this.props.avatarSrc && <Avatar src={this.props.avatarSrc} />}
                <TextBox>
                    <Text useMonserrat type="subheading" color="primary" fontWeight="medium">{this.props.primary || "Primary text"}</Text>
                    <Text type="title" color="black" fontSize={this.props.smallPrimary ? "1rem" : "2rem"}>{this.props.secondary || "SecondaryText"}</Text>
                </TextBox>
            </Wrapper>
        )
    }
}

export default ListItem