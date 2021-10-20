import React, { UIEvent, useState } from "react"
import { Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"

const Scene = () => {
  return (
    <>
      <pointLight intensity={1.0} position={[-5, -1, 3]} />
      <ambientLight intensity={0.4} />
      <mesh castShadow position={[1, -1, 0]}>
        <boxBufferGeometry args={[1, 0.1, 0.2]} />
        <meshStandardMaterial color="#0391BA" />
      </mesh>
      <mesh castShadow position={[1, -0.5, 0]}>
        <boxBufferGeometry args={[1, 0.1, 0.2]} />
        <meshStandardMaterial color="#0391BA" />
      </mesh>
      <mesh castShadow position={[1, 0, 0]}>
        <boxBufferGeometry args={[1, 0.1, 0.2]} />
        <meshStandardMaterial color="#0391BA" />
      </mesh>
      <mesh receiveShadow>
        <planeBufferGeometry args={[4, 2.5, 1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </>
  )
}

const Cam = (props: { position: number }) => {
  const { camera } = useThree()

  React.useEffect(() => {
    camera.position.y = props.position / -100
  })

  return null
}

const scrollStyles = {
  position: "absolute" as any,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  overflow: "auto",
}

export const App = () => {
  const [scrollPos, setScrollPos] = useState(0)

  function handleScroll(evt: UIEvent) {
    setScrollPos(evt.currentTarget.scrollTop)
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        dpr={2}
        mode="concurrent"
        shadows
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 0, 3],
        }}
        onCreated={({ gl }) => gl.setClearColor("#252934")}
      >
        <Suspense fallback={null}>
          <Scene />
          <Cam position={scrollPos} />
        </Suspense>
      </Canvas>
      <div style={{ ...scrollStyles }} onScroll={handleScroll}>
        <div style={{ height: "150%" }} />
      </div>
    </div>
  )
}

export default App
