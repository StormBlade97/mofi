import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    margin: 2rem 0;
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
            <Wrapper style={this.props.style || {}}>
                <TextBox>
                    <Text style={{ marginBottom: this.props.children ? "1.5rem" : "1rem" }} useMonserrat={false} type="title" color="accent" fontSize="0.9em" fontWeight="medium">{this.props.primary || "Primary text"}</Text>
                    { this.props.children ? this.props.children : <Text type="body" color="black">{this.props.secondary || "SecondaryText"}</Text> }
                </TextBox>
            </Wrapper>
        )
    }
}

export default ListItem
