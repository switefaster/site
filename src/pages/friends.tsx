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
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
    const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // @ts-expect-error
        Matter.Resolver._restingThresh = 0.1;

        // Create engine
        const newEngine = Matter.Engine.create({
            gravity: { y: 0 },
        });
        // Create mouse constraint for dragging
        const mouseConstraint = Matter.MouseConstraint.create(newEngine, {
            mouse: Matter.Mouse.create(containerRef.current),
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });
        Matter.World.add(newEngine.world, mouseConstraint);
        // Create walls
        const walls = [
            Matter.Bodies.rectangle(width / 2, -10, width, 20, {
                isStatic: true, restitution: 1, friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
            }),
            Matter.Bodies.rectangle(width / 2, height + 10, width, 20, {
                isStatic: true, restitution: 1, friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
            }),
            Matter.Bodies.rectangle(-10, height / 2, 20, height, {
                isStatic: true, restitution: 1, friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
            }),
            Matter.Bodies.rectangle(width + 10, height / 2, 20, height, {
                isStatic: true, restitution: 1, friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
            }),
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
        const maxSpeed = 15; // Maximum speed magnitude
        const updatePositions = () => {
            const newPositions: { [key: string]: { x: number; y: number } } = {};
            friendBodies.forEach(body => {
                // Clamp velocity
                const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
                if (speed > maxSpeed) {
                    const scale = maxSpeed / speed;
                    Matter.Body.setVelocity(body, {
                        x: body.velocity.x * scale,
                        y: body.velocity.y * scale,
                    });
                }
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

    const handleBallClick = (name: string, event: React.MouseEvent) => {
        // Check if this was a drag or a click
        if (dragStartPosRef.current) {
            const moveDistance = Math.sqrt(
                Math.pow(event.clientX - dragStartPosRef.current.x, 2) +
                Math.pow(event.clientY - dragStartPosRef.current.y, 2)
            );
            // If moved more than 5px, it's a drag, not a click
            if (moveDistance > 5) {
                dragStartPosRef.current = null;
                return;
            }
        }
        dragStartPosRef.current = null;

        setSelectedFriend(name);
        if (engine) {
            const body = Matter.Composite.allBodies(engine.world).find(b => b.label === name);
            if (body) {
                velocitiesRef.current[name] = { ...body.velocity };
                Matter.Body.setStatic(body, true);
            }
        }
    };

    const handleBallMouseDown = (event: React.MouseEvent) => {
        dragStartPosRef.current = { x: event.clientX, y: event.clientY };
    };

    const closePopup = () => {
        const friendName = selectedFriend;
        setSelectedFriend(null);
        if (friendName && engine) {
            const body = Matter.Composite.allBodies(engine.world).find(b => b.label === friendName);
            if (body) {
                Matter.Body.setStatic(body, false);
                const vel = velocitiesRef.current[friendName];
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
                onClick={closePopup}
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
                    return (
                        <div
                            key={friend.name}
                            style={{
                                position: 'absolute',
                                left: pos.x - 50,
                                top: pos.y - 50,
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                backgroundImage: `url(${friend.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'default',
                                transition: 'transform 0.2s',
                                transform: selectedFriend === friend.name ? 'scale(1.1)' : 'scale(1)',
                            }}
                            onMouseDown={handleBallMouseDown}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBallClick(friend.name, e);
                            }}
                        >
                            {selectedFriend === friend.name && (
                                friend.homepage ? (
                                    <a
                                        href={friend.homepage}
                                        onClick={(e) => e.stopPropagation()}
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
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'block',
                                        }}
                                    >
                                        <strong>{friend.name}</strong>
                                    </a>
                                ) : (
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
                                )
                            )}
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}