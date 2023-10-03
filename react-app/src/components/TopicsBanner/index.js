import "./TopicsBanner.css";

export const TopicsBanner = ({ topics, history }) => {
    return (
        <div className="topic-banner">
            {topics.map(topic =>
                <span className="one-topic" onClick={() => history.push(`/topics/${topic.id}`)} >
                    <i className="fas fa-tag"></i>
                    <p>{topic.name}</p>
                </span>
            )}
        </div>
    )
}
