let webSocket: WebSocket | null = null

let subscribers = {
    'messages-recived': [] as SubscribersType[],
    'status-changed': [] as StatusChangedType[]
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach((s) => s(status))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const closeHandler = () => {
    notifySubscribersAboutStatus('penging')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-recived'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    webSocket?.removeEventListener('close', closeHandler)
    webSocket?.removeEventListener('message', messageHandler)
    webSocket?.removeEventListener('open', openHandler)
}

function createChannel() {
    cleanUp()
    webSocket?.close()

    webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    notifySubscribersAboutStatus('penging')

    webSocket.addEventListener('close', closeHandler)
    webSocket.addEventListener('message', messageHandler)
    webSocket.addEventListener('open', openHandler)
}


export const chatWebSocketApi = {
    start() {
        createChannel()
    },

    stop() {
        subscribers['messages-recived'] = []
        subscribers['status-changed'] = []
        cleanUp()
        webSocket?.close()
    },

    subscribe(eventName: EventsNameType, callback: SubscribersType | StatusChangedType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventsNameType, callback: SubscribersType | StatusChangedType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(newMessage: string) {
        webSocket?.send(newMessage)
    },
}


export type ChatResponseType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'penging' | 'ready'
type SubscribersType = (chatMessages: ChatResponseType[]) => void
type StatusChangedType = (status: StatusType) => void
type EventsNameType = 'messages-recived' | 'status-changed'