import React from 'react'
import styled, { withTheme } from 'styled-components'
import Text from 'atomic-components/Text'
import Shadow from 'atomic-components/Shadow'
import { grey } from 'material-ui/colors'
import ReactStars from 'react-stars'
import tinyColor from 'tinycolor2'
import MuiButton from 'material-ui/Button'

const CardWrapper = styled(Shadow)`
    max-width: 30rem;
    width: calc(100vw - 2rem);
    border-radius: 6px;
    padding: 1rem;
    box-sizing: border-box;
`

const DualityBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: ${ props => props.noGutter ? "0 1rem" : "1rem"};
    align-items: center;
`
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
`
const ContranstTextBox = styled.span`
    display: inline;
    white-space: nowrap;
`
const Icon = styled.i`
    font-size: 1.2rem;
`
const Button = styled(MuiButton)`
`

const SoftText = props => (<Text style={{ display: 'inline' }} color={grey[400]} type="body" fontWeight="thin" noWrap {...props}/>)
const StrongText = props => (<Text style={{ display: 'inline' }} color={grey[900]} type="body" fontWeight="bold" noWrap {...props}/>)
const RatingRaw = props => <ReactStars
    color2={props.theme.primary}
    color1={tinyColor(props.theme.primary).setAlpha(0.1).toRgbString()}
    {...props}/>
const Rating = withTheme(RatingRaw)

class Card extends React.Component {
    render() {
        return (
            <CardWrapper elevation={10} {...this.props}>
                <DualityBox>
                    <TitleBox>
                        <Text color="black" type="title" fontWeight="bold" useMonserrat={false}>{this.props.title}</Text>
                        <SoftText>{this.props.subtitle}</SoftText>
                    </TitleBox>
                    <SoftText><Icon className="material-icons">access_time</Icon>{this.props.duration}</SoftText>
                </DualityBox>
                <DualityBox>
                    <Text color= "#191919" type="body">
                    {this.props.summary}
                    </Text>
                </DualityBox>
                <DualityBox>
                    <ContranstTextBox>
                        <SoftText>Director</SoftText>: <StrongText>{this.props.director}</StrongText>
                    </ContranstTextBox>
                    <ContranstTextBox>
                        <SoftText>Stars: </SoftText>
                        <StrongText noWrap>{this.props.stars}</StrongText>
                    </ContranstTextBox>
                </DualityBox>
                <DualityBox noGutter>
                <Rating
                    count={5}
                    size={24}
                    value={this.props.rating}
                    edit={false}
                />
                <Button onClick={this.props.onExpand}>
                    <Text useMonserrat={false} color="accent" fontWeight="bold" fontSize="1rem">More info</Text>
                </Button>
                </DualityBox>
            </CardWrapper>
        )
    }
}

export default Card