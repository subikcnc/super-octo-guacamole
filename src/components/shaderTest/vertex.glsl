uniform vec2 uResolution;
uniform float uSize;
uniform vec3 uColor;
uniform float uProgress;
varying vec3 vColor;

attribute vec3 aPositionTarget; // Get the targe positions in the vertex shader

void main()
{
    vColor = uColor;
    // Mixing the current and the target positions
    vec3 mixedPosition = mix(position, aPositionTarget, uProgress);

    // Final position
    //vec4 modelPosition = modelMatrix * vec4(position, 1.0); // Now for the final position we replace position inside vec4(position, 1.0) to the mixedPosition calculated above
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);
}