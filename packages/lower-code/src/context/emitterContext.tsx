import React from 'react'
import EventEmitter from 'eventemitter3'
const EventContext = React.createContext<EventEmitter>(new EventEmitter())

export default EventContext
