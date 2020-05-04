using System;
using System.Collections.Generic;
using System.Text;
using Happnin.Data;

namespace Happnin.Business.Dto
{
    public class Image : ImageInput, IEntity
    {
        public int Id { get; set; }
    }

}
