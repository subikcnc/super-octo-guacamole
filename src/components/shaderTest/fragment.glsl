// Fully solid color
varying vec3 vColor;
void main() {
  vec2 uv = gl_PointCoord;
  float dist = length(uv - 0.5);

  // Kill fragments outside the circle (fade edges slightly)
  if (dist > 0.5) discard;

  vec3 color = vec3(vColor); // hot pink
  float alpha = 1.0;

  gl_FragColor = vec4(color, alpha);
}



// void main()
// {
//     vec2 uv = gl_PointCoord;
//     float distanceToCenter = length(uv - 0.5);
//     float alpha = 0.05 / distanceToCenter - 0.1;

//     gl_FragColor = vec4(1.0, 1.0,1.0, alpha);
//     #include <tonemapping_fragment>
//     #include <colorspace_fragment>
// }
// void main() {
//     float d = length(gl_PointCoord - 0.5);
//     float alpha = smoothstep(0.2,0.0,d); // Tighter glow

//     vec3 color = vec3(1.0,1.0, 0.3); // pink glow

//     gl_FragColor = vec4(color*alpha*1.5, alpha); // boost brightness
// }    