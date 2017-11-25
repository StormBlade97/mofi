import React from 'react'
import styled from 'styled-components'
import Text from 'atomic-components/Text'
import Tag from './Tag'
import MuiButton from 'material-ui/Button'
import {observer} from 'mobx-react';
import MovieStore from '../swing/MovieStore';
import {withRouter} from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 54px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;
`

const TagLine = styled.div`
    width: 100vw;
    overflow: scroll;
    white-space: nowrap;
    scroll-behavior: smooth;
`
const Button = styled(MuiButton)`
border-radius: 3rem !important;
padding: 1rem 1.5rem !important;
width: calc(100vw - 8rem) !important;
max-width: 40rem;
`

@observer
class FilterView extends React.Component {

    componentDidMount() {
        this.tagCloud.childNodes.forEach(tagline => {
            const random = Math.round(Math.random());
            tagline.scrollLeft = random * 100;
        })
    }
    handleTagSelect = (label) => {
        const oldTags = this.state.tags;
        const index = oldTags.findIndex(curr => curr.label === label);
        oldTags[index].active = !oldTags[index].active;
        this.setState({ tags: oldTags });
        // your mobx logic here
    }
	readyClick = () => {
		this.props.history.push("/app/selection");
	}
    render() {
        return (
            <Wrapper>
                <div>
                    <Text type="display1" color="black" fontWeight="bold" gutterBottom>I'm in mood to watch</Text>
                    <Text color="black" style={{ margin: "0 3rem" }} useMonserrat={false} type="title" fontWeight="light">Select the filters that best describe your preferences</Text>
                </div>
                <div ref={instance => this.tagCloud = instance}>
                    {
                        Object.keys(MovieStore.tags).map(tagline => (<TagLine key={tagline}>
                        {
							MovieStore.tags[tagline].tags.map((tag, i) => <Tag onClick={() => this.handleTagSelect(tag.label)} key={i} label={tag.label} active={tag.active}></Tag>)
                        }
                    </TagLine>))
                    }
                </div>
                <Button color="primary" raised onClick={this.readyClick}><Text type="subheading" useMonserrat={false}>Ready</Text></Button>
            </Wrapper>
        )
    }
}
export default withRouter(FilterView);
