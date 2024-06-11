<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

  let renderer, scene, camera, cube;

  onMount(() => {
    // Vytvorte renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Pridajte VRButton na vstup do VR režimu
    document.body.appendChild(VRButton.createButton(renderer));

    // Vytvorte scénu
    scene = new THREE.Scene();

    // Vytvorte kameru
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);
    scene.add(camera);

    // Pridajte osvetlenie
    const light = new THREE.HemisphereLight(0x606060, 0x404040);
    scene.add(light);

    // Pridajte objekt
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1, -5);
    scene.add(cube);

    // Animácia
    renderer.setAnimationLoop(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    });

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
      document.body.removeChild(VRButton.createButton(renderer));
    };
  });

  onDestroy(() => {
    renderer.dispose();
  });
</script>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>
