import React from 'react'
import styled, { withTheme } from 'styled-components'
import Text from 'atomic-components/Text'
import Shadow from 'atomic-components/Shadow'
import { grey } from 'material-ui/colors'
import ReactStars from 'react-stars'
import tinyColor from 'tinycolor2'
import MuiButton from 'material-ui/Button'
import ListItem from './ListItem'
import Caserolle from './Caserolle'

const CardWrapper = styled(Shadow)`
    background-color: white;
    max-width: 30rem;
    width: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    max-height: 100vh;
    ${props => props.expanded && "max-height: 1000px;"};
    transition: all 1s ease;
    font-size: 14px;
    position: relative;
    margin: auto;
`
const CardContent = styled.div`
    padding: 1.5rem;
`
const CardMedia = styled(Shadow)`
    background-image: url(${props => props.src});
    width: ${ props => props.expanded ? "100%" : "80%" };
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 1s ease;
    z-index: 10;
    border-radius: 6px;
`
const DualityBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: ${ props => props.noGutter ? "0" : "1rem 0"};
    align-items: center;
`
const CenterizeBox = styled.div`
    display: flex;
    justify-content: center;
    margin: 1.5rem;
    transition: all 1s ease;
`
const CardMediaContainer = styled.div`
    width: 100%;
    height: ${ props => props.expanded ? "30vh" : "30vh" /* grow by 10vh*/};
    transform: ${props => props.expanded ? "none" : "translateY(-10vh)"};
    display: flex;
    justify-content: center;
    ${props => !props.expanded && "margin-bottom: -10vh"};
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
	state = {
		boxWidth: 0
	}
    componentDidMount() {
        // for the Caserolle to work
        this.setState({
            boxWidth: this.wrapperBox.clientWidth - 16*2 
        });
    }
    handleExpand = () => this.setState({ expanded: true })
    render() {
        const productionCompanyLogo = "http://www.swiremarketing.com/gallery/aspects-that-make-a-film-production-company-worth-hiring-picutre/Aspects-that-make-a-film-production-company-worth-hiring.jpg";
        let companies = [];
        //if (this.props.productionCompanies ) {
			//companies = this.props.productionCompanies.map(e => ({...e, src: productionCompanyLogo}));
		//}
		//console.log(companies);
        return (
            <CardWrapper innerRef={instance => this.wrapperBox = instance} expanded={this.props.expanded} elevation={10} shadowColor={grey[400]} {...this.props}>
                <CardMediaContainer expanded={this.props.expanded}>
                    <CardMedia expanded={this.props.expanded} elevation={this.props.expanded ? 0 : 10} primary src={this.props.posterUrl} style={{animation: "bounceIn 0.5s ease"}} />
                </CardMediaContainer>
                <CardContent>
                    <DualityBox>
                        <TitleBox>
                            <Text color="black" type="title" fontWeight="bold" useMonserrat={false}>{this.props.title}</Text>
                            <SoftText>{this.props.subtitle}</SoftText>
                        </TitleBox>
                        <SoftText><Icon className="material-icons">access_time</Icon>{this.props.duration} mins</SoftText>
                    </DualityBox>
                    {
                        this.props.expanded && <CenterizeBox>
                            <Rating
                                count={5}
                                size={32}
                                value={this.props.rating}
                                edit={false}
                            />
                        </CenterizeBox>
                    }
                    <DualityBox>
                        <Text color= "#191919" type="body">
                        {this.props.summary}
                        </Text>
                    </DualityBox>
                    {!this.props.expanded ? (
                        [<DualityBox >
							{ false &&
                            <ContranstTextBox>
                                <SoftText>Director</SoftText>: <StrongText>{this.props.director}</StrongText>
                            </ContranstTextBox>
                            }
                            <ContranstTextBox>
                                <SoftText>Release date: </SoftText>
                                <StrongText noWrap>{this.props.releaseDate}</StrongText>
                            </ContranstTextBox>
                        </DualityBox>,
                        <DualityBox style={{ marginBottom: 0 }}>
                            <Rating
                                count={5}
                                size={24}
                                value={this.props.rating}
                                edit={false}
                            />
                            <Button onClick={this.handleExpand}>
                                <Text useMonserrat={false} color="accent" fontWeight="bold" fontSize="1rem">More info</Text>
                            </Button>
                        </DualityBox>
                        ])
                    : (
                        <div>
                            <ListItem smallPrimary primary="Release date" secondary={this.props.releaseDate}/>

							{ false &&
                            <ListItem smallPrimary primary="Stars">
                                <Caserolle width={this.state.boxWidth} pictureType="avatar" items={this.props.actors}/>
                            </ListItem>
                            }
							{ false &&
                            <ListItem smallPrimary primary="Awards" secondary={this.props.award}/>
                            }
							<ListItem smallPrimary primary="Budget" secondary={`\$${this.props.budget} million`}>
                            </ListItem>
                        </div>
                    )
                    }
                </CardContent>
            </CardWrapper>
        )
    }
}

export default Card
