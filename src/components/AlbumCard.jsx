import React from 'react'
import styled from 'styled-components';

export default function AlbumCard(props) {
    const {title} = props
    return (
        <Container>
          <div className="title">
            {title}
          </div>
          </Container>
      )
    }
    
    const Container = styled.div`
    
    `;