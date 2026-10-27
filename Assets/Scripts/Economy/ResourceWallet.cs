using System;
using UnityEngine;

namespace Nexora.Economy
{
    public enum ResourceType
    {
        Credits,
        Metal,
        Energy
    }

    public sealed class ResourceWallet : MonoBehaviour
    {
        [SerializeField] private int credits = 500;
        [SerializeField] private int metal = 250;
        [SerializeField] private int energy = 100;

        public event Action Changed;

        public int Get(ResourceType type) => type switch
        {
            ResourceType.Credits => credits,
            ResourceType.Metal => metal,
            ResourceType.Energy => energy,
            _ => 0
        };

        public void Add(ResourceType type, int amount)
        {
            if (amount <= 0) return;
            Set(type, Get(type) + amount);
        }

        public bool TrySpend(ResourceType type, int amount)
        {
            if (amount < 0 || Get(type) < amount) return false;
            Set(type, Get(type) - amount);
            return true;
        }

        private void Set(ResourceType type, int value)
        {
            value = Mathf.Max(0, value);
            switch (type)
            {
                case ResourceType.Credits: credits = value; break;
                case ResourceType.Metal: metal = value; break;
                case ResourceType.Energy: energy = value; break;
            }
            Changed?.Invoke();
        }
    }
}
