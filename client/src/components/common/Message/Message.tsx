interface Message {
    role: string,
    content: string
}

export const Message = (props: Message) => {
    const { role, content } = props
    return <div>
        <h5>{role}</h5>

        <div>
            {content}
        </div>
    </div>
}