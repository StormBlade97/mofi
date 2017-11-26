import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'

const CaserolleWrapper = styled.div`
    white-space: nowrap;
    overflow: scroll;
    ${props => props.useFlex && "display: flex"};
`
const StyledImg = styled.img`
    object-fit: cover;
    height: 6rem;
    margin-left: 6px;
    display: inline;    
`
const SAvatar = styled(Avatar)`
    height: 6rem !important;
    width: 6rem !important;
`
const Caserolle = props => <CaserolleWrapper useFlex={props.pictureType === "avatar"} style={{ width: props.width || "100%" }}>
    {
        props.pictureType === "avatar" ?
            (props.items || []).map((item, index) => (
                <SAvatar imgProps={{ style: { objectFit: "contain" } }} style={{ marginLeft: 4 }} key={index} src={item.src} />
            ))
        : (props.items || []).map((item, key) => <StyledImg src={item.src}></StyledImg>)
    }
</CaserolleWrapper>

export default Caserolle
