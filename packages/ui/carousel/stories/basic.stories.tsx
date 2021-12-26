import React, { useEffect, useState } from 'react'
import Carousel from '../src'

export const Basic = () => {
  return (
    <>
      <h1>Basic</h1>
      <div className="carousel-basic__wrap" style={{ width: '760px', height: '320px' }}>
        <Carousel duration={3000} dotPosition={'outer'} dotType={'dot'} arrowSize={'small'}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <img
              src={
                'https://images.unsplash.com/photo-1451772741724-d20990422508?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
              alt={'1'}
              onClick={() => console.error('1')}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                color: '#fff',
                fontSize: '36px',
                textShadow: '2px 2px 8px #fff',
              }}
            >
              Christmas
            </div>
          </div>
          <img
            src={
              'https://images.unsplash.com/photo-1595923941716-39a9c58a9661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            }
            alt={'2'}
            onClick={() => console.error('2')}
          />
          <img
            src={
              'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
            }
            alt={'3'}
            onClick={() => console.error('3')}
          />
          <img
            src={
              'https://images.unsplash.com/photo-1640280056011-e1c0fda0fef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
            }
            alt={'4'}
            onClick={() => console.error('4')}
          />
        </Carousel>
      </div>
    </>
  )
}