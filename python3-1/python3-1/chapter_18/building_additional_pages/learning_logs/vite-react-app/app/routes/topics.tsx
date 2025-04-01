import { useState, useEffect } from "react";
import { Link } from "react-router";

interface Topic {
  id: number;
  text: string;
  date_added: string;
}

export default function Topics() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setIsLoading(true);
                // 替换为您的Django API端点
                const response = await fetch('/api/topics/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 如果需要认证，添加认证头
                    },
                    // credentials: 'include',  // 如果需要发送cookies
                });
                
                if (!response.ok) {
                    throw new Error(`API请求失败: ${response.status}`);
                }
                
                const data = await response.json();
                setTopics(data);
                setError(null);
            } catch (err) {
                console.error('获取主题失败:', err);
                setError('获取主题列表时出错，请稍后再试');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">学习主题列表</h2>
            
            {isLoading && <p className="text-gray-500">加载中...</p>}
            
            {error && <p className="text-red-500">{error}</p>}
            
            {!isLoading && !error && (
                topics.length > 0 ? (
                    <nav>
                        <ul className="list-disc pl-5">
                            {topics.map(topic => (
                                <li key={topic.id} className="mb-2">
                                    <Link to={`/topics/${topic.id}`} className="text-blue-500 hover:underline">{topic.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ) : (
                    <p className="text-gray-500">没有找到学习主题。</p>
                )
            )}
        </div>
    );
}