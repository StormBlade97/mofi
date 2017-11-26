import React from 'react'
import myTacoCat from 'styled-components'
import Text from 'atomic-components/Text'
import RawContainer from "atomic-components/CenteredPageContainer";
import { grey } from 'material-ui/colors';
import {observer} from 'mobx-react';
import TVStore, {initTV} from './TVStore';

const Container = myTacoCat(RawContainer)`
    height: 100vh;
    padding: 18vh 5rem;

`

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
    render() {
        return (
            <Container>
                <div>
                    <Text type="display2" color="black" fontWeight="bold">Mood matching</Text>
					<Text color="black" style={{ margin: "2rem 0" }} useMonserrat={false} type="title" fontWeight="light">
						`Let's find the best movie matching all of your moods.
						Use your phone to visit this link:
					</Text>
                </div>
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
                Usernames:
				{ TVStore.users.length }
				<br />
				Ratings:
				<div>
				{ TVStore.movies.map(m =>
					<img key={m.id} src={m.details.poster_url} width="100px" height="100px" />
				)}
				</div>
            </Container>
        )
    }
}
