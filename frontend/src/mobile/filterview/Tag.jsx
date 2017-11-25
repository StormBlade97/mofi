import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'
import { grey } from 'material-ui/colors'

const Tag = styled.button`
    padding: 0.5rem 1.5rem;
    border-radius: 3rem;
    background-color: transparent;
    border: 2px ${props => props.active ? props.theme.accent : grey[300] };
    border-style: solid;
    box-sizing: border-box;
    outline: none;
    transition: all 0.3s ease;
    margin: 1rem 0.5rem;
`

const TagPill = props => <Tag {...props} active={props.active} className={props.className}>
    <Text color={props.active ? "accent" : grey[300]}>{props.label || "Sometag"}</Text>
</Tag>

export default TagPill