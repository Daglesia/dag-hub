const fragmentShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = vec3(abs(vUv.x - 0.2)/6.0  * (1.0 - distort*5.0), 0.0, 0.0);
    gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;