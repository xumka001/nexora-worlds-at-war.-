using UnityEngine;

namespace Nexora.Player
{
    [RequireComponent(typeof(CharacterController))]
    public sealed class ThirdPersonPlayerController : MonoBehaviour
    {
        [SerializeField] private float moveSpeed = 5f;
        [SerializeField] private float rotationSpeed = 12f;
        [SerializeField] private float gravity = -20f;
        [SerializeField] private Transform cameraTransform;

        private CharacterController controller;
        private float verticalVelocity;

        private void Awake()
        {
            controller = GetComponent<CharacterController>();
        }

        private void Update()
        {
            // Keyboard fallback makes the prototype immediately testable in Editor.
            float horizontal = Input.GetAxisRaw("Horizontal");
            float vertical = Input.GetAxisRaw("Vertical");
            Vector2 input = Vector2.ClampMagnitude(new Vector2(horizontal, vertical), 1f);

            Vector3 forward = cameraTransform != null ? cameraTransform.forward : Vector3.forward;
            Vector3 right = cameraTransform != null ? cameraTransform.right : Vector3.right;
            forward.y = 0f;
            right.y = 0f;
            forward.Normalize();
            right.Normalize();

            Vector3 movement = forward * input.y + right * input.x;

            if (movement.sqrMagnitude > 0.001f)
            {
                Quaternion targetRotation = Quaternion.LookRotation(movement);
                transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            }

            if (controller.isGrounded && verticalVelocity < 0f)
                verticalVelocity = -2f;

            verticalVelocity += gravity * Time.deltaTime;
            movement.y = verticalVelocity;
            controller.Move(movement * moveSpeed * Time.deltaTime);
        }
    }
}
