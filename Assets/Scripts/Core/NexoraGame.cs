using UnityEngine;

namespace Nexora.Core
{
    /// <summary>
    /// Persistent root for global NEXORA systems.
    /// Add this component to a GameObject named "NexoraGame" in the bootstrap scene.
    /// </summary>
    public sealed class NexoraGame : MonoBehaviour
    {
        public static NexoraGame Instance { get; private set; }

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);
            Application.targetFrameRate = 60;
        }
    }
}
