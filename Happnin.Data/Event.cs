using System;
using System.Collections.Generic;

namespace Happnin.Data
{
    public class Event : EntityBase
    {
        private string _name;
        public string Name
        {
            get => _name; 
            set => _name = value ?? throw new ArgumentNullException(nameof(Name));
        }
        
        private string _description;
        public string Description
        {
            get => _description; 
            set => _description = value ?? throw new ArgumentNullException(nameof(Description));
        }

        public int? ImageId { get; set; }

        private Image _image;
        public Image Image
        {
            get => _image;
            set => _image = value ?? throw new ArgumentNullException(nameof(Image));
        }


        public int LocationId { get; set; }
        private Location _location;
        public Location Location
        {
            get => _location; 
            set => _location = value ?? throw  new ArgumentNullException(nameof(Location));
        }
        
        public string HostId { get; set; }
        private User _host;
        public User Host
        {
            get => _host; 
            set => _host = value ?? throw new ArgumentNullException(nameof(Host));
        }
        public DateTime EventTime { get; set; }
        private DateTime _endTime;
        public DateTime EndTime 
        { 
            get => _endTime;
            set
            {
                if (value > EventTime)
                {
                    _endTime = value;
                }
                else
                {
                    throw new ArgumentException("End time entered must be larger than the event start time");
                }
            }
        }
        public double Cost { get; set; }
        public int AgeRestriction { get; set; }
        public List<User> Attendees { get;  } = new List<User>();
        public int CategoryId { get; set; } 
        public Category Category { get; set; }
        public Event(string name, string description, Category category,
        DateTime eventTime, DateTime endTime, double cost, int ageRestriction, 
             User host, Location location) 
            : this(name, description, eventTime, endTime, cost, ageRestriction)
        {
            Location = location;
            Host = host;
            Category = category;
        }

        private Event(string name, string description, DateTime eventTime, DateTime endTime, double cost, int ageRestriction)
        {
            Name = name;
            Description = description;
            EventTime = eventTime;
            EndTime = endTime;
            Cost = cost;
            AgeRestriction = ageRestriction;
        }

        public bool AddAttendee(User attendee)
        {
            bool added = false;
            
            if (attendee != null)
            {
                Attendees.Add(attendee);
                added = true;
            }

            return added;
        }
    }
}
