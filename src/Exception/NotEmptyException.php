<?php

namespace App\Exception;

use Exception;
use ReturnTypeWillChange;

class NotEmptyException extends Exception
{
    public function __construct($message = "Is not empty", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    #[ReturnTypeWillChange]
    public function __toString()
    {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}