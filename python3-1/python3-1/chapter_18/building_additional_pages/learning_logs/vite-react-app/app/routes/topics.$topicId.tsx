import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

interface Topic {
  id: number;
  text: string;
  date_added: string;
}

interface Entry {
  id: number;
  topic: number;
  text: string;
  date_added: string;
}

export default function TopicDetail() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopicAndEntries = async () => {
            try {
                setIsLoading(true);
                
                // 获取主题详情
                const topicResponse = await fetch(`/api/topics/${topicId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!topicResponse.ok) {
                    throw new Error(`获取主题详情失败: ${topicResponse.status}`);
                }
                const topicData = await topicResponse.json();
                setTopic(topicData);
                
                // 获取主题相关的条目
                const entriesResponse = await fetch(`/api/topics/${topicId}/entries/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!entriesResponse.ok) {
                    throw new Error(`获取条目列表失败: ${entriesResponse.status}`);
                }
                const entriesData = await entriesResponse.json();
                setEntries(entriesData);
                
                setError(null);
            } catch (err) {
                console.error('获取数据失败:', err);
                setError('获取主题和条目数据时出错，请稍后再试');
            } finally {
                setIsLoading(false);
            }
        };

        if (topicId) {
            fetchTopicAndEntries();
        }
    }, [topicId]);

    if (isLoading) {
        return <div>加载中...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!topic) {
        return <div>未找到该主题</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-2">{topic.text}</h2>
            <p className="text-gray-600 mb-4">创建时间: {new Date(topic.date_added).toLocaleString()}</p>
            
            <div className="entries bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">条目列表</h3>
                {entries.length > 0 ? (
                    <ul className="space-y-2">
                        {entries.map(entry => (
                            <li key={entry.id} className="entry p-2 border-b border-gray-200">
                                <div className="entry-text text-lg">{entry.text}</div>
                                <div className="entry-date text-gray-500">
                                    {new Date(entry.date_added).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">该主题下还没有条目。</p>
                )}
            </div>
            
            <div className="actions mt-4">
                <Link to="/topics" className="text-blue-500 hover:underline">返回主题列表</Link>
            </div>
        </div>
    );
} 