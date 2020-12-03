import React from 'react';
import styled from 'styled-components';
import OperationButton from './OperationButton';
import {IoAddCircleOutline,IoRemoveCircleOutline} from 'react-icons/io5'
export default function OperationsList() {

    return (
        <List>
            <OperationButton>
                <IoAddCircleOutline className='thick'/>
                New in
            </OperationButton>
            <OperationButton>
                <IoRemoveCircleOutline className='thick'/>
                New out
            </OperationButton>
        </List>
    );
}

const List = styled.div`
    width:85vw;
    flex-grow:1;
    display:flex;
    padding: 10px 0;
    
    & >:first-child{
        margin-right: 5px;
    }
    & >:last-child{
        margin-left: 5px;
    }
    .thick{
        font-size:20px;
    }
`
