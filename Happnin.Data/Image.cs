using System;
using System.Collections.Generic;
using System.Text;

namespace Happnin.Data
{
    public class Image : EntityBase
    {
        private string _file;
        public string File
        {
            get => _file;
            set => _file = value ?? throw new ArgumentNullException(nameof(File));
        }
    }
}
