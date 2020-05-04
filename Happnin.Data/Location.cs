using System;

namespace Happnin.Data
{
    public class Location : EntityBase
    {
        private string _address;
        public string Address
        {
            get => _address; 
            set => _address = value ?? throw new ArgumentNullException(nameof(Address));
        }
        
        private string _city;
        public string City
        {
            get => _city;
            set => _city = value ?? throw new ArgumentNullException(nameof(City));
        }
      
        private string _state; 
        public string State 
        {
            get => _state;
            set => _state = value ?? throw new ArgumentNullException(nameof(State));
        }
        
        private string _zipCode;
        public string ZipCode
        {
            get => _zipCode; 
            set => _zipCode = value ?? throw new ArgumentNullException(nameof(ZipCode));
        }

        private string _country;
        public string Country
        {
            get => _country;
            set => _country = value ?? throw new ArgumentNullException(nameof(Country));
        }

        private string _lat;

        public string Lat 
        {
            get => _lat;
            set => _lat = value ?? throw new ArgumentNullException(nameof(Lat));
        }

        private string _lng;

        public string Lng
        {
            get => _lng;
            set => _lng = value ?? throw new ArgumentNullException(nameof(Lng));
        }

        public Location(string address, string city, string state, string country, string zipCode, string lat, string lng)
        {
            Address = address;
            City = city;
            State = state;
            Country = country;
            ZipCode = zipCode;
            Lat = lat;
            Lng = lng;
        }

    }
}
