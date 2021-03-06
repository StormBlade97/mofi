import React from 'react'
import myTacoCat from 'styled-components'
import Text from 'atomic-components/Text'
import Shadow from 'atomic-components/Shadow'
import RawContainer from "atomic-components/CenteredPageContainer";
import {observer} from 'mobx-react';
import TVStore, {initTV} from './TVStore';
import UserListItem from '../mobile/card/ListItem';
import Button from 'material-ui/Button';
import tinyColor from 'tinycolor2';

const Container = myTacoCat(RawContainer)`
    height: 100vh;
    padding: 0vh 5rem;
    justify-content: center;
    background-color: #D7D9E2;
`
const InnerContainer = myTacoCat.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;    
`

const GridCard = myTacoCat(Shadow)`
    padding: 2rem;
    background-color: white;
    width: 40%;
    border-radius: 6px;
    `
    const GridContainer = myTacoCat.div`
    margin-top: 3rem;    
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const MovieListWrapper = myTacoCat.div`
    display: flex;
    transtion: all 0.3s ease;
    margin: 1rem 0;
`
const MovieMedia = myTacoCat(Shadow)`
    background-image: url(${props => props.src});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    width: 12rem;
    background-color: red;
    min-height: 8rem;
    background-position: center center;
`
const MovieInfoWrapper = myTacoCat.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
    border-radius: 6px;
`
const Icon = myTacoCat.i`
    color: ${props => props.theme.primary};
    font-weight: 300;
    ${props => props.noTransform || "transform: scale(0.8) translateY(4px)"};
    ${props => props.noTransform || "transform-origin: center bottom"};
    margin-right: 4px;
`
const MovieControlWrapper = myTacoCat.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
`
const PlayButtonWrapper = myTacoCat(Button)`
    border: 1px ${props => props.theme.primary} solid !important;
    box-shadow: none !important;
    background-color: transparent !important;
    width: 36px !important;
    height: 36px !important;
`

const PillButton = myTacoCat(Button)`
    border: 2px ${props => props.theme.primary} solid !important;
    border-radius: 3rem !important;
    padding: 0.5rem 2rem;
    max-height: 40px;
`

const PlayButton = props => <PlayButtonWrapper fab>
    <Icon noTransform style={{ margin: 0 }} className="material-icons">play_arrow</Icon>
</PlayButtonWrapper>

const MovieListItem = props => (
    <MovieListWrapper>
        <MovieMedia src={props.posterSrc}></MovieMedia>
        <MovieInfoWrapper>
            <div>
                <Text type="body" useMonserrat fontWeight="1.2rem" color="black">{props.title}</Text>
                <Text style={{ textAlign: "left" }} type="body" fontSize="0.9rem" fontWeight="light" color="#949494">{props.duration} mins</Text>
            </div>
            <MovieControlWrapper>
                 <span>
                    <Icon className="material-icons">favorite_border</Icon>
                    <Text style={{ display: "inline" }} type="body" fontSize="0.9rem" fontWeight="light" color="primary">{props.likes || 0} likes</Text>
					{ props.dislikes > 0 &&
					<span>
                    <Icon className="material-icons" style={{paddingLeft: "30px", color: "red"}}>thumb_down</Icon>
                    <Text style={{ display: "inline" }} type="body" fontSize="0.9rem" fontWeight="light" color="red">{props.dislikes || 0} dislikes</Text>
					</span>
                }
                </span>
                <PlayButton></PlayButton>
            </MovieControlWrapper>
        </MovieInfoWrapper>
    </MovieListWrapper>
)

@observer
export default class MainPage extends React.Component {
	componentWillMount() {
		initTV();
	}
	componentDidMount() {
		TVStore.startMonitor();
	}
	componentWillUnmount() {
		TVStore.stopMonitor();
	}
	refreshSession = async () => {
		TVStore.getCode();
	};
    render() {
        const roomNotEmpty = TVStore.users.length !== 0;
        return (
            <Container>
				{ TVStore.empty ? <InnerContainer>
                    <Text type="display2" color="black" fontWeight="bold">Mood matching</Text>
                    <Text color="black" style={{ margin: "1rem 0" }} useMonserrat={false} type="title" fontWeight="light">
                        Let's find the best movie matching all of your moods.
                        Use your phone to visit this link:
                    </Text>
                    <Text color="primary" style={{ margin: "0 2rem" }} useMonserrat={false} type="display1" fontWeight="bold">
                        { TVStore.appURL }
                    </Text>
    				{ TVStore.code &&
                      <div>
                    	<div>
                    	    <Text color="black" style={{ margin: "2rem 0" }} useMonserrat={false} type="title" fontWeight="light">
                    	        Or scan the following QR code
                    	    </Text>
                    	    <img src={TVStore.codeQRURL} width="300px" alt=""/>
                    	</div>
                    	<div>
                    	    <Text color="black" style={{ margin: "2rem 0" }} useMonserrat={false} type="title" fontWeight="light">
                    	        Code
                    	    </Text>
                    	    <Text color="accent" style={{ margin: "0 2rem" }} useMonserrat={false} type="display1" fontWeight="bold">
                    	    {TVStore.code}
                    	</Text>
    				    </div>
    				  </div>
                    }
                </InnerContainer>
                    : <InnerContainer>
                        <Text type="display2" color="black" fontWeight="bold">Mood matching</Text>
                        <GridContainer>
                            <GridCard style={{ width: "30%", overflow: "auto"}}>
                                <Text type="subheading" color="black" fontWeight="bold">PARTICIPANTS</Text>
                                { TVStore.users.map((user, index) => <UserListItem
                                    style={{ borderBottom: (index === TVStore.users.length -1) ? "none" : "1px rgba(0,0,0, .3) solid",
                                        padding: (index === TVStore.users.length -1) ? 0 : "1rem 0" }
                                    }
                                    primary={user.name}
                                    avatarSrc={user.avatar_url}
                                    secondary={`${user.rated_movies} movies`}
                                />) }
                            </GridCard>
                            <GridCard style={{ width: "50%" }}>
                                <Text gutterBottom type="subheading" color="black" fontWeight="bold">TOP 3 MATCHES</Text>
                                { TVStore.movies.slice(0, 3).map(movie => <MovieListItem
                                	key={movie.id}
                                	likes={movie.likes}
                                	dislikes={movie.dislikes}
                                    title={movie.details.title}
                                    subtitle={movie.details.tagline}
                                    posterSrc={movie.details.poster_url}
                                    duration={movie.details.runtime}
                                />) }
                            </GridCard>
                        </GridContainer>
                        <MovieControlWrapper style={{ marginTop: "1rem" }}>
                            <MovieListWrapper style={{ justifyContent: "space-between", width: "100%" }}>
                                <div style={{ display: "flex" }}>
                                    <MovieMedia style={{ height: "auto", width: "auto", minHeight: "4rem", minWidth: "4rem"}} src={TVStore.codeQRURL}></MovieMedia>
                                    <MovieInfoWrapper style={{ justifyContent: "center" }}>
                                    <div>
                                        <Text type="body" color="black">{TVStore.appURL}</Text>
                                        <Text style={{ textAlign: "left" }} type="body" fontSize="1.3rem" fontWeight="bold" color="accent">{TVStore.code}</Text>
                                    </div>
                                    </MovieInfoWrapper>
                                </div>
                                <div style={{ display: "flex" }}>
                                <PillButton style={{ marginRight: "1rem" }}><Text color="primary">End session</Text></PillButton>
                                <PillButton onClick={this.refreshSession} ><Text color="primary">Refresh session</Text></PillButton>
                                </div>
                            </MovieListWrapper>
                        </MovieControlWrapper>
                    </InnerContainer>
                }
            </Container>
        )
    }
}
