import Cards, { Card } from '../swipe-card'
import React, { Component } from 'react';


const data = ['Alexandre', 'Thomas', 'Lucien']

function action() {

}

export default () => {
  return (
    <div>
      Cards
      <Cards onEnd={action('end')} className='master-root'>
          {data.map(item =>
            <Card
              onSwipeLeft={action('swipe left')}
              onSwipeRight={action('swipe right')}>
              <h2>{item}</h2>
            </Card>
          )}
        </Cards>
    </div>
  )
}
