uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;

attribute vec3 aPositionTarget; // Should be points on a sphere
varying vec3 vColor;

void main()
{
    // Just linear progress from position to aPositionTarget
    vec3 from = position;
    vec3 to = normalize(aPositionTarget) * length(aPositionTarget); // ensure sphere shape

    // Progress eased linearly (or use smoothstep if you want easing)
    float progress = smoothstep(0.0, 1.0, uProgress);
    vec3 mixedPosition = mix(from, to, progress);

    // Transform to clip space
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size and color
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // Just assign a fixed color or based on position if you want
    vColor = vec3(1.0); // white color, or use any fixed vec3 value
}
