import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface Friend {
    name: string;
    description: string;
    avatar: string;
    homepage?: string;
}

const friends: Friend[] = [
    {
        name: 'Yaossg',
        description: '香肠',
        avatar: 'https://yaossg.com/site/img/sausage-128.png', // placeholder
        homepage: 'https://yaossg.com',
    },
    {
        name: 'KawaiiZapic',
        description: 'Zapic',
        avatar: 'https://i.zapic.moe/static/192.png',
        homepage: 'https://blog.zapic.moe/',
    },
    {
        name: 'ustc-zzzz',
        description: '土球',
        avatar: 'https://avatars.githubusercontent.com/u/8004211',
        homepage: 'https://blog.ustc-zzzz.net/',
    },
    {
        name: 'Czz',
        description: 'Czz',
        avatar: 'https://czz.ink/img/avatar.jpg',
        homepage: 'https://czz.ink/',
    },
    {
        name: '45gfg9',
        description: '箱子',
        avatar: 'https://45gfg9.net/static/img/avatar.png',
        homepage: 'https://45gfg9.net/',
    },
    {
        name: 'DoodleHuang',
        description: 'Doodle',
        avatar: 'https://assets.doodlehuang.com/myface.png',
    },
];

export default function Friends(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
    const [engine, setEngine] = useState<Matter.Engine | null>(null);
    const velocitiesRef = useRef<{ [key: string]: Matter.Vector }>({});
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create engine
        const newEngine = Matter.Engine.create();
        newEngine.gravity.y = 0; // No gravity for floating

        // Create walls
        const walls = [
            Matter.Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, restitution: 1 }),
            Matter.Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, restitution: 1 }),
            Matter.Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, restitution: 1 }),
            Matter.Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, restitution: 1 }),
        ];
        Matter.World.add(newEngine.world, walls);

        // Create friend bodies
        const friendBodies = friends.map((friend, index) => {
            const radius = 50;
            const x = Math.random() * (width - 2 * radius) + radius;
            const y = Math.random() * (height - 2 * radius) + radius;
            const body = Matter.Bodies.circle(x, y, radius, {
                restitution: 1,
                friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
                render: {
                    fillStyle: '#ffffff',
                },
            });
            body.label = friend.name;
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 });
            return body;
        });
        Matter.World.add(newEngine.world, friendBodies);

        // Update positions
        const updatePositions = () => {
            const newPositions: { [key: string]: { x: number; y: number } } = {};
            friendBodies.forEach(body => {
                newPositions[body.label] = { x: body.position.x, y: body.position.y };
            });
            setPositions(newPositions);
        };

        Matter.Events.on(newEngine, 'afterUpdate', updatePositions);

        // Run engine
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, newEngine);
        runnerRef.current = runner;

        setEngine(newEngine);

        // Cleanup
        return () => {
            Matter.Engine.clear(newEngine);
            Matter.Events.off(newEngine, 'afterUpdate', updatePositions);
            if (runnerRef.current) {
                Matter.Runner.stop(runnerRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (name: string) => {
        setHovered(name);
        if (engine) {
            const body = Matter.Composite.allBodies(engine.world).find(b => b.label === name);
            if (body) {
                velocitiesRef.current[name] = { ...body.velocity };
                Matter.Body.setStatic(body, true);
            }
        }
    };

    const handleMouseLeave = (name: string) => {
        setHovered(null);
        if (engine) {
            const body = Matter.Composite.allBodies(engine.world).find(b => b.label === name);
            if (body) {
                Matter.Body.setStatic(body, false);
                const vel = velocitiesRef.current[name];
                if (vel) {
                    Matter.Body.setVelocity(body, vel);
                }
            }
        }
    };

    return (
        <Layout
            title={`${siteConfig.title}`}
            description={`${siteConfig.title} - ${siteConfig.tagline}`}>
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '80vh',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                }}
            >
                {friends.map((friend) => {
                    const pos = positions[friend.name] || { x: 0, y: 0 };
                    const commonStyles = {
                        position: 'absolute' as const,
                        left: pos.x - 50,
                        top: pos.y - 50,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundImage: `url(${friend.avatar})`,
                        backgroundSize: 'cover' as const,
                        backgroundPosition: 'center' as const,
                        transition: 'transform 0.2s',
                        transform: hovered === friend.name ? 'scale(1.1)' : 'scale(1)',
                        display: 'block',
                        textDecoration: 'none',
                        cursor: friend.homepage ? 'pointer' : 'default',
                    };

                    const element = friend.homepage ? (
                        <a
                            key={friend.name}
                            href={friend.homepage}
                            style={commonStyles}
                            onMouseEnter={() => handleMouseEnter(friend.name)}
                            onMouseLeave={() => handleMouseLeave(friend.name)}
                        >
                            {hovered === friend.name && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: -60,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'white',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                                        whiteSpace: 'nowrap',
                                        zIndex: 10,
                                    }}
                                >
                                    <strong>{friend.name}</strong>
                                </div>
                            )}
                        </a>
                    ) : (
                        <div
                            key={friend.name}
                            style={commonStyles}
                            onMouseEnter={() => handleMouseEnter(friend.name)}
                            onMouseLeave={() => handleMouseLeave(friend.name)}
                        >
                            {hovered === friend.name && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: -60,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'white',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                                        whiteSpace: 'nowrap',
                                        zIndex: 10,
                                    }}
                                >
                                    <strong>{friend.name}</strong>
                                </div>
                            )}
                        </div>
                    );

                    return element;
                })}
            </div>
        </Layout>
    );
}