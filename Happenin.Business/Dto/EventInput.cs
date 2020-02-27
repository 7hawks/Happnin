using System;
using System.ComponentModel.DataAnnotations;

namespace Happnin.Business.Dto
{
    public class EventInput
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int LocationId { get; set; }
        public int CategoryId { get; set; }
        public int HostId { get; set; }
        [DataType(DataType.Time)]
        public DateTime EventTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Cost { get; set; }
        public int AgeRestriction { get; set; }
    }
}