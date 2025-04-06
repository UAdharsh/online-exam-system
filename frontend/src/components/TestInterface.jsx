import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTest, submitTest } from '../utils/api';

const TestInterface = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTest = await fetchTest(testId);
            setTest(fetchedTest);
        };
        fetchData(); 

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    handleSubmit();
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [testId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        if (!isSubmitted) {
            await submitTest(testId, answers);
            setIsSubmitted(true);
            alert('Test submitted successfully!');
        }
    }; 

    const handleTabSwitch = () => {
        setTabSwitchCount(prev => {
            if (prev >= 2) {
                handleSubmit();
                return prev;
            }
            return prev + 1;
        });
    };

    useEffect(() => {
        window.addEventListener('blur', handleTabSwitch);
        return () => {
            window.removeEventListener('blur', handleTabSwitch);
        };
    }, []);

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{test.title}</h1>
            <p>Time Remaining: {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}</p>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {test.questions.map(question => (
                    <div key={question.id}>
                        <h3>{question.text}</h3>
                        {question.options.map(option => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => handleAnswerChange(question.id, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit" disabled={isSubmitted}>Submit Test</button>
            </form>
        </div>
    );
};

export default TestInterface;